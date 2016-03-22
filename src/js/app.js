import ArrayItem from "./array-item";
import React from "react";

// simple unique Id for data
let nextId = 0;

export default React.createClass({

	getInitialState() {
		return {
			// input values
			attentionInput: '',
			importantInput: '',
			weightInput: '1',
			
			// data
			yLabels: {}, // attention getters
			xLabels: {}, // important things
			scores: {}   // many-to-many x-y scores
		}
	},

	addYLabel() {
		let yId = nextId;
		nextId += 1;
		// add label
		let yLabels = Object.assign({}, this.state.yLabels);
		yLabels[yId] = {
			id: yId,
			text: this.state.attentionInput
		};

		// clear input
		let attentionInput = '';

		// add scores
		let scores = Object.assign({}, this.state.scores);
		Object.keys(this.state.xLabels).forEach((xId) => {
			let scoreId = xId + '-' + yId;
			let value = 1; // default
			scores[scoreId] = { xId, yId, value };
		});

		// update internal state
		this.setState({ yLabels, attentionInput, scores });
	},

	addXLabel() {
		let xId = nextId;
		nextId += 1;
		// add label
		let xLabels = Object.assign({}, this.state.xLabels);
		xLabels[xId] = {
			id: xId,
			text: this.state.importantInput,
			weight: this.state.weightInput
		};

		// clear inputs
		let importantInput = '';
		let weightInput = '1';

		// add scores
		let scores = Object.assign({}, this.state.scores);
		Object.keys(this.state.yLabels).forEach((yId) => {
			let scoreId = xId + '-' + yId;
			let value = 1; // default
			scores[scoreId] = { yId, yId, value };
		});

		// update internal state
		this.setState({ xLabels, importantInput, weightInput, scores });
	},

	updateInput(e) {
		let state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	},

	handleEnter(e) {
		if (e.which === 13) {
			e.preventDefault();
			let name = e.target.name;

			if (name === 'attentionInput') {
				this.addYLabel();
				this.refs.attentionInput.focus();
			} else if (name === 'importantInput' || name === 'weightInput') {
				this.addXLabel();
				this.refs.importantInput.focus();
			}
		}
	},

	updateScore(e) {
		let scoreId = e.target.name;
		let value = e.target.value;

		let scores = this.state.scores;
		scores[scoreId] = Object.assign({}, scores[e.target.name], { value });
		this.setState({ scores });
	},

	getYSum(yId) {
		let sum = 0;
		
		Object.keys(this.state.xLabels).forEach((xId) => {
			let xLabel = this.state.xLabels[xId];
			let score = this.state.scores[xId + '-' + yId];
			sum += xLabel.weight * score.value;
		});

		return sum;
	},

	render: function() {
		return <div>
			<p>
				<label>
					What has your attention? <br />
					<input 
						name="attentionInput"
						onChange={this.updateInput} 
						onKeyDown={this.handleEnter}
						placeholder="Writing, Coding, etc."
						ref="attentionInput" 
						type="text" 
						value={this.state.attentionInput}
						/>
					<button onClick={this.addYLabel}>Add</button>
				</label>
			</p>

			<p>
				<label>
					What is an important thing in your life? <br />
					<input 
						name="importantInput"
						onChange={this.updateInput} 
						onKeyDown={this.handleEnter}
						placeholder="Money, Passion, etc." 
						type="text" 
						value={this.state.importantInput}
						ref="importantInput"
						/>
					<input
						name="weightInput"
						onChange={this.updateInput}
						onKeyDown={this.handleEnter}
						type="number"
						value={this.state.weightInput}
						/>
					<button onClick={this.addXLabel}>Add</button>
				</label>
			</p>
			
			<table cellSpacing="0" cellPadding="0">
				<thead>
						<tr>
						<td></td>
						{Object.keys(this.state.xLabels).map((xId) => {
							let xLabel = this.state.xLabels[xId];
							return <ArrayItem key={xId}>
								<th>{xLabel.text} (x{xLabel.weight})</th>
							</ArrayItem>;
						})}
					</tr>
				</thead>
				<tbody>
					{Object.keys(this.state.yLabels).map((yId) => {
						let yLabel = this.state.yLabels[yId];
						return <ArrayItem key={yId}>
							<tr>
								<th>{yLabel.text}</th>
								{Object.keys(this.state.xLabels).map((xId) => {
									return <ArrayItem key={xId}>
										<td>
											<select
												name={xId + '-' + yId}
												onChange={this.updateScore}>
												<option>1</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
												<option>6</option>
												<option>7</option>
												<option>8</option>
												<option>9</option>
												<option>10</option>
											</select>
										</td>
									</ArrayItem>;
								})}
								<td>
									<input 
										className="ySum"
										type="text"
										readOnly
										value={this.getYSum(yId)}
										/>
								</td>
							</tr>
						</ArrayItem>;
					})}
				</tbody>
			</table>
		</div>;
	}
});

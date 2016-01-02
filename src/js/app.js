import React from "react";

export default React.createClass({
	getInitialState() {
		return {
			// input values
			attentionInput: '',
			importantInput: '',
			multiplierInput: '1',
			
			// data
			attentionGetters: [],
			importantThings: []
		}
	},

	addAttentionGetter(e) {
		var attentionGetters = this.state.attentionGetters;
		attentionGetters.push({
			text: this.state.attentionInput,
			values: []
		});
		this.setState({
			attentionGetters: attentionGetters,
			attentionInput: ''
		});
	},

	addImportantThing(e) {
		var importantThings = this.state.importantThings;
		
		importantThings.push({
			multiplier: this.state.multiplierInput,
			text: this.state.importantInput
		});
		
		this.setState({
			importantThings: importantThings,
			importantInput: ''
		});
	},

	updateInput(e) {
		var state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	},

	handleEnter(e) {
		if (e.which === 13) {
			e.preventDefault();
			var name = e.target.name;
			var value = e.target.value;
		}
	},

	updateValue(e) {
		var name = e.target.name;
		var importantThing = name.slice(0, name.indexOf('['));
		console.log(importantThing);
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
						type="text" 
						value={this.state.attentionInput}
						/>
					<button onClick={this.addAttentionGetter}>Add</button>
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
						/>
					<input
						name="multiplierInput"
						onChange={this.updateInput}
						onKeyDown={this.handleEnter}
						type="number"
						value={this.state.multiplierInput}
						/>
					<button onClick={this.addImportantThing}>Add</button>
				</label>
			</p>
			
			<table cellSpacing="0" cellPadding="0">
				<thead>
						<tr>
						<td></td>
						{this.state.importantThings.map((importantThing, i) => {
								return <th>{importantThing.text} (x{importantThing.multiplier})</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{this.state.attentionGetters.map((attentionGetter) => {
						return <tr>
							<th>{attentionGetter.text}</th>
							{this.state.importantThings.map((importantThing) => {
								return <td>
									<select onChange={this.updateTotal}>
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
								</td>;
							})}
							<td>
								<input 
									className="total"
									ref={attentionGetter.text+'-total'}
									type="text"
									/>
							</td>
						</tr>;
					})}
				</tbody>
			</table>
		</div>;
	}
});

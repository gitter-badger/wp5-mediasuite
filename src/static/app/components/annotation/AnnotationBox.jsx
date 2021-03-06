import React from 'react';
import AnnotationAPI from '../../api/AnnotationAPI';
import AnnotationCreator from './AnnotationCreator';
import FlexModal from '../FlexModal';

import AnnotationActions from '../../flux/AnnotationActions';

//TODO dependancy on jquery!! fix this later
//TODO make sure the editing form can be shown in a div rather than a pop-up. This is important, because modals
//prevent you from watching the video while annotating

//TODO the annotation list does not show only items that are relevant for the current annotation target:
//it simply shows all annotations

//http://andrewhfarmer.com/react-ajax-best-practices/

class AnnotationBox extends React.Component {

	constructor(props) {
		super(props);
	}

	saveAnnotation(annotation) {
		AnnotationActions.save(annotation, this.onSave.bind(this));

	}

	onSave(annotation) {
		$('#annotation__modal').modal('hide');//TODO ugly, but without this the static backdrop won't disappear!
		if(this.props.onSave) {
			this.props.onSave(annotation);
		}
	}

	render() {
		return (
			<div>
				{this.props.showModal ?
					<FlexModal
						elementId="annotation__modal"
						handleHideModal={this.props.hideAnnotationForm.bind(this)}
						title={'Add annotation to: ' + this.props.activeAnnotation.target.source}>
						<AnnotationCreator
							activeAnnotation={this.props.activeAnnotation}

							saveAnnotation={this.saveAnnotation.bind(this)}

							annotationModes={this.props.annotationModes}
						/>
					</FlexModal>: null
				}
			</div>
		);
	}
};

export default AnnotationBox;